import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JiraService {

    constructor(private httpService : HttpService , private configService : ConfigService) {}

    jiraBaseUrl = this.configService.get<string>("jiraBaseUrl") || "";
    jiraApiToken = this.configService.get<string>("jiraApiToken") || "";
    jiraEmail = this.configService.get<string>("jiraEmail") || "";
    
    
    async createIssue(projectKey : string, 
                      summary : string,
                      description : string
                      ) : Promise<any> {
        

        const url = `${this.jiraBaseUrl}/rest/api/3/issue`;
        const data = {
            fields: {
              project: {
                key: projectKey,
              },
              summary,
              description: {
                type: 'doc',
                version: 1,
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        text: description,
                        type: 'text',
                      },
                    ],
                  },
                ],
              },
              issuetype: {
                name: 'Task',
              },
            },
          };

          const auth = {
            username: this.jiraEmail,
            password: this.jiraApiToken,
          };

          return this.httpService.post(url , data , { auth }).toPromise()
    }

    async delete(issueIdOrKey : string){
        const url = `${this.jiraBaseUrl}/rest/api/3/issue/${issueIdOrKey}`
        const auth = {
          username : this.jiraEmail,
          password: this.jiraApiToken,
        };

        try {
          const response = await this.httpService.delete(url , {auth}).toPromise();
          console.log('Issue deleted succesfully ',response?.data);
          return response?.data;
          
        } catch (err) {
          console.error('Error deleting issue: ',err);
          throw err;
        }
    }

    // ttodo 10000 in-progress 10001 done 10002
    async update(jiraIssueId : string , transitionId : string) {
          
         const url = `${this.jiraBaseUrl}/rest/api/3/issue/${jiraIssueId}/transitions`;
         const data = {
          transition : transitionId
        };

        const auth = {
          username : this.jiraEmail,
          password : this.jiraApiToken,
        }
        const headers = {
          'Content-Type': 'application/json',
        };

        try {
          const response = await firstValueFrom(
            this.httpService.post(url , data , {auth , headers}),
          );
          return response.data;
        } catch (error) {
          console.log(error);
          ;
        }
    }

//     async getRecentIssues() {
//       try {
//         const response = await axios.get(`${this.jiraBaseUrl}/rest/api/3/search`, {
//           auth: {
//             username: this.jiraEmail,
//             password: this.jiraApiToken,
//           },
//           params: {
//             jql: 'ORDER BY created DESC',
//             maxResults: 10,
//           },
//         });
//         return response.data.issues.map((issue: any) => ({
//           jiraIssueId: issue.id,
//           key: issue.key,
//           summary: issue.fields.summary,
//           description: issue.fields.description,
//           issueType: issue.fields.issuetype.name,
//           ticketStatus: issue.fields.status.name,
//           priority: issue.fields.priority?.name || 'Low',
//           issueCreatedBy: issue.fields.creator.displayName,
//           projectKey: issue.fields.project.key,
//         }));
//       } catch (error) {
//         console.error('Error while scraping jira data:', error);
//         throw error;
//     }
// }
   

    


}

