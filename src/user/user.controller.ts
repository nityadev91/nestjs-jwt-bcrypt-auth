import { Controller, NotFoundException, UseGuards } from '@nestjs/common';
import { Body, Param, Get, Post, Put, Delete, Patch } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private userService: UserService, private configService: ConfigService) { }

    @Post('signup')
    signUp(@Body() user: UserDto) {
        // Implementation for creating a user
        return this.userService.create(user);
    }


    @UseGuards(JwtAuthGuard)
    @Get('all')
    findAll() {
        return this.userService.findAll();
    }

    @Get('all/:username')
    findOne(@Param('username') username: string) {
        // Implementation for finding a single user
        return this.userService.findOneByUsername(username);
    }


    @Put('all/:username')
    async update(@Param('username') username: string, @Body() updateData: Omit<User, 'id' | 'is_active' | 'createdAt' | 'updatedAt'>) {
        return this.userService.update(username, updateData);
    }

    @Delete('all/:username')
    remove(@Param('username') username: string) {
        // Implementation for deleting a user
        return this.userService.remove(username);
    }

    @Get('aistudio')
    async getAiExplanation() {
        const api_key = this.configService.get('Gemini_API_KEY') || '';

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${api_key}`;

        const payload = {
            contents: [{
                // parts: [{ text: "Generate a list of 5000 random us-based people names in the format ${firstName},${lastName}. Provide the raw data only. Do not use numbering, bullet points, or any introductory/concluding text. Each name must be on a new line." }]
                parts: [{ text: "Good Morning, ChatGPT!." }]
            }]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            // Check if the response has the expected data structure
            if (data.candidates && data.candidates.length > 0) {
                return data.candidates[0].content.parts[0].text;
            } else {
                // return "Unexpected response format from AI API.";
            }

        } catch (error) {
            console.error("API Error:", error);
            return "Error fetching AI response.";
        }
    }
}